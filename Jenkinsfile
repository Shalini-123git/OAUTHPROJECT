pipeline {
    agent any

    stages {

        stage('Build') {
            steps {
                echo 'Building OAuth project...'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing OAuth project...'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
            		cp ~/OAUTHPROJECT/server/.env server/.env
            		docker compose up -d
        	'''
            }
        }
    }
}
