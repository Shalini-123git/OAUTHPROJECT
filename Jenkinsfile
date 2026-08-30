pipeline {
	agent any
	
	stages {
		stage('Build') {
			steps {
				echo 'Building Oauth project...'
			}
		}
	
		stage('Test') {
			steps {
				echo 'Testing Oauth peoject...'
			}
		}
	
		stage('Docker Build') {
			steps {
				sh 'docker compose build'
			}
		}
	}
}
