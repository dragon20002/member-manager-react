/* Jenkins Pipeline 실행스크립트 */
node {
  def app

  stage('Clone repository') {
    /* clone 확인 */
    checkout scm
  }

  stage('Build image') {
    app = docker.build("tairian20002/member-manager")
  }

  stage('Test image') {
    app.inside {
      sh 'echo "테스트 정상"'
    }
  }

  stage('Push image') {
    docker.withRegistry('https://registry.hub.docker.com', 'my-docker') {
      app.push("${env.BUILD_NUMBER}")
      app.push("latest")
    }
  }
}
