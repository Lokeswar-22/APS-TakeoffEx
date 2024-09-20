require('dotenv').config();

module.exports = {
    credentials: {
        
        client_id: process.env.APS_CLIENT_ID,
        client_secret: process.env.APS_CLIENT_SECRET,
        callback_url: process.env.APS_CALLBACK_URL
    },
    scopes: {
        internal: ['bucket:create', 'bucket:read', 'data:read', 'data:create', 'data:write'],

        internal_2legged: ['data:read', 'bucket:read', 'bucket:create', 'data:write', 'bucket:delete', 'account:read', 'account:write'],

        public: ['viewables:read']
    },
    accountv1:{
        URL:{
            COMPANY_URL:    "https://developer.api.autodesk.com/hq/v1/accounts/{0}/projects/{1}/companies",
            USER_URL:       "https://developer.api.autodesk.com/hq/v1/accounts/{0}/users/{1}",
        }
      },
    
    takeoff:{
        URL:{
            PACKAGES_URL:        "https://developer.api.autodesk.com/construction/takeoff/v1/projects/{0}/packages",
            ITEMS_URL:           "https://developer.api.autodesk.com/construction/takeoff/v1/projects/{0}/packages/{1}/takeoff-items",
            TAKEOFF_TYPES:       "https://developer.api.autodesk.com/construction/takeoff/v1/projects/{0}/packages/{1}/takeoff-types",
            TAKEOFF_TYPE:        "https://developer.api.autodesk.com/construction/takeoff/v1/projects/{0}/packages/{1}/takeoff-types/{2}",
            CONTENT_VIEW:        "https://developer.api.autodesk.com/construction/takeoff/v1/projects/{0}/content-views",
            CLASSIFICATION_SYSTEMS: "https://developer.api.autodesk.com/construction/takeoff/v1/projects/{0}/classification-systems",
            ALL_CLASSIFICATIONS: "https://developer.api.autodesk.com/construction/takeoff/v1/projects/{0}/classification-systems/{1}/classifications",
            LOCATIONS: "https://developer.api.autodesk.com/construction/locations/v2/projects/{0}/trees/default/nodes",
            CLASSIFICATIONS_IMPORT: "https://developer.api.autodesk.com/construction/takeoff/v1/projects/{0}/classification-systems/{1}/classifications:import",
            SETTINGS: "https://developer.api.autodesk.com/construction/takeoff/v1/projects/{0}/settings"
        }
    },
    
};
