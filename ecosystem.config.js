module.exports = {

  apps: [
    // Main service
    {
      name          : 'ATON Main Service',
      script        : 'services/ATON.service.main.js',
      instances     : 'max',
      exec_mode     : 'cluster',
      watch         : ["services","config"],
      instance_var  : 'INSTANCE_ID',
      merge_logs    : true,
      //restart_delay : 1000,
      //out_file     : "./logs/ATON.service.main.log",
      env: {
        "NODE_ENV" : "production",
      }
    },

    // VRoadcast service
    {
      name          : 'ATON VRoadcast Service',
      script        : 'services/ATON.service.vroadcast.js',
      instances     : 1,
      exec_mode     : 'cluster',
      watch         : ["services","config"],
      merge_logs    : true,
      //restart_delay : 1000,
      //out_file     : "./logs/ATON.service.vrc.log",
      env: {
        "NODE_ENV" : "production",
      }
    },

    // WebDav service
    {
      name          : 'ATON WebDav Service',
      script        : 'services/ATON.service.webdav.js',
      instances     : 1,
      exec_mode     : 'cluster',
      watch         : ["services", "config"],
      merge_logs    : true,
      //restart_delay : 1000,
      //out_file     : "./logs/ATON.service.webdav.log",
      env: {
        "NODE_ENV" : "production",
      }
    },

    // Maat service
/*
    {
      name         : 'ATON Maat Service',
      script       : 'services/ATON.service.maat.js',
      instances    : 1,
      exec_mode    : 'cluster',
      watch        : ["services", "config"]
    }
*/
    // Atonizer
/*
    {
      name      : 'ATONIZER Service',
      script    : 'ATON.SERVICE.atonizer.js',
      instances : 1,
      exec_mode : 'fork',
      watch     : true
    }
*/
  ]
};
