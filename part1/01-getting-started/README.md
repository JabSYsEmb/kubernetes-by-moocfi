# Image build
```
$ docker build . -t getting-started
```

first run a cluster with specifying the number of agents in our case 2 agent
```
$ k3d cluster create -a 2
```

verify you have the cluster created by running
```
$ docker ps -a 
CONTAINER ID   IMAGE                            COMMAND                  CREATED          STATUS          PORTS                             NAMES
b25a9bb6c42f   ghcr.io/k3d-io/k3d-tools:5.4.1   "/app/k3d-tools noop"    56 seconds ago   Up 55 seconds                                     k3d-k3s-default-tools
19f992606131   ghcr.io/k3d-io/k3d-proxy:5.4.1   "/bin/sh -c nginx-pr…"   56 seconds ago   Up 32 seconds   80/tcp, 0.0.0.0:50122->6443/tcp   k3d-k3s-default-serverlb
7a8bf6a44099   rancher/k3s:v1.22.7-k3s1         "/bin/k3d-entrypoint…"   56 seconds ago   Up 43 seconds                                     k3d-k3s-default-agent-1
c85fbcbcf9b2   rancher/k3s:v1.22.7-k3s1         "/bin/k3d-entrypoint…"   56 seconds ago   Up 43 seconds                                     k3d-k3s-default-agent-0
7191a3bdae7a   rancher/k3s:v1.22.7-k3s1         "/bin/k3d-entrypoint…"   56 seconds ago   Up 52 seconds                                     k3d-k3s-default-server-0
```

you may need to let kubeclt read the config file created by k3d by running
```
$ k3d kubeconfig get k3s-default
config file is stored under ~/.kube/config
$ kubectl config use-context <name-of-cluster>
```
check if the cluster got granted
```
$ kubectl cluster-info
Kubernetes control plane is running at https://0.0.0.0:50122
CoreDNS is running at https://0.0.0.0:50122/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
Metrics-server is running at https://0.0.0.0:50122/api/v1/namespaces/kube-system/services/https:metrics-server:https/proxy
```

now you need to deploy our application that we had built at the first namely getting-started
by creating a deployment object:
```
$ kubectl create deployment <name-of-the-app> --image=our-custom-image <getting-started>
deployment.apps/name-of-the-app created
$ kubectl get pods
NAME                                 READY   STATUS    RESTARTS   AGE
hashgenerator-dep-68f7d87497-k5q9d   1/1     Running   0          2m49s
hash-dep-798669fb7c-sssng            1/1     Running   0          99s
```

```
$ kubectl logs -f hash-dep-798669fb7c-sssng      
    2023-02-26T22:16:53.759Z 4c7891cc4c1c5b9e25055a69126b4d88dbad0b63
    2023-02-26T22:16:58.767Z 4c7891cc4c1c5b9e25055a69126b4d88dbad0b63
    2023-02-26T22:17:03.772Z 4c7891cc4c1c5b9e25055a69126b4d88dbad0b63
    2023-02-26T22:17:08.779Z 4c7891cc4c1c5b9e25055a69126b4d88dbad0b63
    2023-02-26T22:17:13.785Z 4c7891cc4c1c5b9e25055a69126b4d88dbad0b63
    2023-02-26T22:17:18.792Z 4c7891cc4c1c5b9e25055a69126b4d88dbad0b63
    2023-02-26T22:17:23.798Z 4c7891cc4c1c5b9e25055a69126b4d88dbad0b63
    2023-02-26T22:17:28.806Z 4c7891cc4c1c5b9e25055a69126b4d88dbad0b63
    2023-02-26T22:17:33.811Z 4c7891cc4c1c5b9e25055a69126b4d88dbad0b63
    2023-02-26T22:17:38.820Z 4c7891cc4c1c5b9e25055a69126b4d88dbad0b63
    2023-02-26T22:17:43.822Z 4c7891cc4c1c5b9e25055a69126b4d88dbad0b63
    2023-02-26T22:17:48.828Z 4c7891cc4c1c5b9e25055a69126b4d88dbad0b63
    2023-02-26T22:17:53.833Z 4c7891cc4c1c5b9e25055a69126b4d88dbad0b63
    2023-02-26T22:17:58.838Z 4c7891cc4c1c5b9e25055a69126b4d88dbad0b63
    2023-02-26T22:18:03.843Z 4c7891cc4c1c5b9e25055a69126b4d88dbad0b63
    2023-02-26T22:18:08.849Z 4c7891cc4c1c5b9e25055a69126b4d88dbad0b63
    2023-02-26T22:18:13.853Z 4c7891cc4c1c5b9e25055a69126b4d88dbad0b63
```
