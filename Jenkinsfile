pipeline {
      agent {
        docker {
            image 'node:21.7.1' 
            args '-p 3000:3000 -u root ' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
    }
}