pipeline {
  agent any
  environment {
    ENVIRONMENT = "production"
    APP_NAME = "octobite-backend"
    DEPLOY_USERNAME = "root"
    DEPLOY_HOST = "165.22.181.229"
  }
  tools {nodejs "node"}

  stages {
    // stage('Setup containers') { 
    //   steps {
    //     withEnv(["PATH=$PATH:/usr/local/bin"]) {
    //       sh 'docker-compose stop && docker stop app'
    //       sh 'docker-compose rm -f && docker rm -f app'
    //     }
    //   }
    // }
    // stage('Run tests') { 
    //   steps {
    //     withEnv(["PATH=$PATH:/usr/local/bin"]) {
    //       sh 'npm run docker_test'
    //     }
    //   }
    //   post {
    //     always {
    //       publishHTML target: [
    //         allowMissing: true,
    //         alwaysLinkToLastBuild: false,
    //         keepAll: true,
    //         reportDir: './coverage',
    //         reportFiles: 'index.html',
    //         reportName: 'Coverage Report'
    //       ]
    //     }
    //   }
    // }
    stage('Deploy') {
      steps {
        sh '''
          bash tools/deploy.sh $DEPLOY_USERNAME $DEPLOY_HOST /var/lib/jenkins/.ssh/id_rsa $APP_NAME $APP_NAME prod
        '''
      }
    }
  }
}
