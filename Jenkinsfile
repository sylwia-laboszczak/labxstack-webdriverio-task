pipeline {
    agent any
    tools {nodejs "myNodeJs"}
    stages {
        stage('Install dependecies') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Run linter') { 
            steps {
                sh 'npm run linter' 
            }
        }
         stage('Run run prettier') { 
            steps {
                sh 'npm run prettier' 
            }
        }      
        stage('Run API test') { 
            steps {
                sh 'npm run test' 
            }
        }
         stage('Run UI test') { 
            steps {
                sh 'npm run wdio' 
            }
        }
    }
}