const checkConfig = (server) => {
    let config = {};
    switch (server) {
      case 'production':
        config = {
          baseUrl: "",
        };
        break;
      case 'local':
        config = {
          baseUrl: "http://localhost:8000/",
        };
        break;
      default:
        console.error("Unknown server type");
        break;
    }
    return config;
  };

export const selectServer = "local";
export const config = checkConfig(selectServer);