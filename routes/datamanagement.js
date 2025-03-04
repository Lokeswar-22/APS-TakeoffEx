const express = require('express');
const { HubsApi, ProjectsApi, FoldersApi, ItemsApi } = require('forge-apis');

const { OAuth } = require('./common/oauth');


let router = express.Router();

router.get('/datamanagement', async (req, res) => {
    // The id querystring parameter contains what was selected on the UI tree, make sure it's valid
    const href = decodeURIComponent(req.query.id);
    if (href === '') {
        res.status(500).end();
        return;
    }

    // Get the access token
    const oauth = new OAuth(req.session);
    const internalToken = await oauth.getInternalToken();
    if (href === '#') {
        // If href is '#', it's the root tree node
        getHubs(oauth.getClient(), internalToken, res);
    } else {
        // Otherwise let's break it by '/'
        const params = href.split('/');
        const resourceName = params[params.length - 2];
        const resourceId = params[params.length - 1];
        if (resourceName === 'hubs') {
            getProjects(resourceId, oauth.getClient(), internalToken, res);
        }
    }
});

async function getHubs(oauthClient, credentials, res) {
    const hubs = new HubsApi();
    const data = await hubs.getHubs({}, oauthClient, credentials);
    const treeNodes = (data.body.data.map((hub) => {
        if (hub.attributes.extension.type !== 'hubs:autodesk.bim360:Account')
            return null;
        else {
            return createTreeNode(
                hub.links.self.href,
                hub.attributes.name,
                'bim360Hubs',
                '',
                true
            );
        }
    }));
    res.json(treeNodes.filter(node => node !== null));
}

async function getProjects(hubId, oauthClient, credentials, res) {
    const projects = new ProjectsApi();
    const data = await projects.getHubProjects(hubId, {}, oauthClient, credentials);
    const treeNodes = data.body.data.map((project) => {
        if (project.attributes.extension.type == "projects:autodesk.bim360:Project"
            && project.attributes.extension.data.projectType == 'ACC') {
            return createTreeNode(
                project.links.self.href,
                project.attributes.name,
                'accprojects',
                project.id,
                false
            );
        } else {
            return null;
        }
    })
    res.json(treeNodes.filter(node => node !== null));
}

// Format data for tree
function createTreeNode(_id, _text, _type, _project_id, _children) {
    return { id: _id, text: _text, type: _type, project_id:_project_id, children: _children };
}

module.exports = router;
