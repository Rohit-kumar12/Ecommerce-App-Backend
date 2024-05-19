podTemplate(yaml: '''
apiVersion: v1
kind: Pod
metadata:
    name: node-pod
spec:
    containers:
    - name: jenkins-slave-image
      image: node:22-alpine
      command:
      - cat
      tty: true
    nodeSelector:
      project: personal
    tolerations:
    - key: "try"
      operator: "Equal"
      value: "succeed"
      effect: "NoSchedule"
''') {
    node(POD_LABEL) {
        container('jenkins-slave-image') {
            stage('Checkout SCM') {
                echo "Hello-World"
            }
        }
    }
}
