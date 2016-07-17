import dockerode from 'dockerode';


class Docker {
  constructor(props) {
    this.client = new dockerode(props);
  }

  fetchAllContainers(callback) {
    return docker.client.listContainers({all: true}, callback);
  }

  containerStats(containerId, callback) {
    const container = this.client.getContainer(containerId);

    container.stats(callback);
  }
}

export const docker = new Docker({
  socketPath: '/var/run/docker.sock'
});
