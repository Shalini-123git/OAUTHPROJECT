pipeline {
    agent any

    stages {

        stage('Build') {
            steps {
                echo 'Building OAuth project...'
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    IMAGE_TAG=build-${BUILD_NUMBER} docker compose build
                '''
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login \
                            -u "$DOCKER_USERNAME" \
                            --password-stdin

                        docker push shalinirajput/oauthproject-backend:build-${BUILD_NUMBER}
                        docker push shalinirajput/oauthproject-frontend:build-${BUILD_NUMBER}

                        docker logout
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    cp /var/lib/jenkins/deploy-secrets/server.env server/.env

                    IMAGE_TAG=build-${BUILD_NUMBER} docker compose up -d

                    rm -f server/.env
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                    sleep 5
                    curl --fail http://localhost:3000/api/top-searches
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    curl --fail http://localhost:3000/api/top-searches
                '''
            }

            post {
                success {
                    sh '''
                        echo "${BUILD_NUMBER}" > /var/lib/jenkins/deploy-secrets/current-build
                    '''
                }

                failure {
                    sh '''
                        if [ -s /var/lib/jenkins/deploy-secrets/current-build ]; then

                            PREVIOUS_BUILD=$(cat /var/lib/jenkins/deploy-secrets/current-build)

                            echo "Health check failed."
                            echo "Rolling back to build-${PREVIOUS_BUILD}"

                            cp /var/lib/jenkins/deploy-secrets/server.env server/.env

                            IMAGE_TAG=build-${PREVIOUS_BUILD} docker compose up -d

                            rm -f server/.env

                        else
                            echo "No previous successful build available."
                            echo "Rollback skipped."
                        fi
                    '''
                }
            }
        }
    }

    post {
        always {
            sh 'docker builder prune -af || true'
        }
    }
}
