pipeline {
    agent { label 'agent-demo-1' }

    tools {
        nodejs 'NodeJS-18'      // ← NodeJS tool configured in Jenkins
    }

    parameters {
        string(name: 'BRANCH_NAME',
               defaultValue: 'master',
               description: 'Git branch to build')
        choice(name: 'ENV',
               choices: ['DEV','QA','UAT','PROD'],
               description: 'Select environment')
    }

    environment {
        APP_NAME    = 'nodejs-app'
        APP_PORT    = '3000'
        APP_DIR     = '/opt/nodejs-app'
    }

    stages {

        stage('Git Clone') {
            steps {
                echo "Cloning branch: ${params.BRANCH_NAME}"
                git branch: "${params.BRANCH_NAME}",
                    url: 'https://github.com/udevops2026/node-js-sample.git',
                    credentialsId: 'git-access-token'
            }
        }

        stage('Check Node Version') {
            steps {
                sh 'node --version'   // verify node installed
                sh 'npm --version'    // verify npm installed
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing npm packages..."
                sh 'npm install'      // like mvn dependency:resolve
                echo "Dependencies installed!"
            }
        }

        stage('Run Tests') {
            steps {
                echo "Running tests..."
                sh 'npm test'         // like mvn test
            }
        }

        stage('Build Application') {
            steps {
                echo "Building application..."
                sh 'npm run build'    // like mvn package
                                      // creates dist/ or build/ folder
            }
        }

        stage('Deploy Application') {
            when {
                expression { params.ENV != 'PROD' }
            }
            steps {
                echo "Deploying to ${params.ENV}..."
                sh """
                    # Copy app files to deployment directory
                    sudo mkdir -p ${APP_DIR}
                    sudo cp -r . ${APP_DIR}/

                    # Install PM2 if not installed
                    # PM2 = process manager for Node.js
                    # Like systemd for Node apps
                    sudo npm install -g pm2

                    # Stop old instance
                    pm2 stop ${APP_NAME} || true
                    pm2 delete ${APP_NAME} || true

                    # Start new instance
                    cd ${APP_DIR}
                    pm2 start index.js --name ${APP_NAME}
                    pm2 save

                    echo "App running at port ${APP_PORT}"
                """
            }
        }

    }

    post {
        success {
            echo "✅ NodeJS app deployed!"
            echo "🌐 http://localhost:${APP_PORT}"
        }
        failure {
            echo "❌ NodeJS deployment failed!"
        }
        always {
            cleanWs()
        }
    }
}
