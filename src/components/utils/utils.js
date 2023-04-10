const resolveHost = () => [process.env.REACT_APP_HOSTNAME, process.env.REACT_APP_PORT].filter(a => a).join(':');

export const host = resolveHost();