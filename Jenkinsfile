pipeline {
    agent any
    tools {nodejs "myNodeJs"}

    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
    }
}