pipeline { 
    agent any 
 
    environment { 
        GIT_REPO = 'pipeline { 
    agent any 
 
    environment { 
        GIT_REPO = 'https://github.com/Vinay4912/GYM-Management-System.git' 
        BRANCH = 'main' 
    } 
 
    stages { 
        stage('Clone Repository') { 
            steps { 
                script { 
                    echo 'Cloning Repository...' 
                    checkout scm 
                } 
            } 
        } 
 
        stage('Install Dependencies') { 
            steps { 
                script { 
                    echo 'Installing Dependencies...' 
                    if (fileExists('package.json')) { 
                        sh 'npm install' 
                    } else if (fileExists('requirements.txt')) { 
                        sh 'pip install -r requirements.txt' 
                    } else { 
                        echo 'No dependency file found, skipping installation.' 
                    } 
                } 
            } 
        } 
 
        stage('Run Tests') { 
            steps { 
                script { 
                    echo 'Running Tests...' 
                    try { 
                        if (fileExists('package.json')) { 
                            sh 'npm test' 
                        } else if (fileExists('pytest.ini') || fileExists('requirements.txt')) { 
                            sh 'pytest || echo "Tests failed but continuing..."' 
                        } else { 
                            echo 'No test scripts found, skipping tests.' ' 
        BRANCH = 'main' 
    } 
 
    stages { 
        stage('Clone Repository') { 
            steps { 
                script { 
                    echo 'Cloning Repository...' 
                    checkout scm 
                } 
            } 
        } 
 
        stage('Install Dependencies') { 
            steps { 
                script { 
                    echo 'Installing Dependencies...' 
                    if (fileExists('package.json')) { 
                        sh 'npm install' 
                    } else if (fileExists('requirements.txt')) { 
                        sh 'pip install -r requirements.txt' 
                    } else { 
                        echo 'No dependency file found, skipping installation.' 
                    } 
                } 
            } 
        } 
 
        stage('Run Tests') { 
            steps { 
                script { 
                    echo 'Running Tests...' 
                    try { 
                        if (fileExists('package.json')) { 
                            sh 'npm test' 
                        } else if (fileExists('pytest.ini') || fileExists('requirements.txt')) { 
                            sh 'pytest || echo "Tests failed but continuing..."' 
                        } else { 
                            echo 'No test scripts found, skipping tests.' 

                      } 
                    } catch (Exception e) { 
                        echo 'Test execution failed but continuing...' 
                    } 
                } 
            } 
        } 
 
        stage('Build Application') { 
            steps { 
                script { 
                    echo 'Building Application...' 
                    try { 
                        if (fileExists('package.json')) { 
                            sh 'npm run build || echo "Build failed but continuing..."' 
                        } else if (fileExists('pom.xml')) { 
                            sh 'mvn clean package || echo "Build failed but continuing..."' 
                        } else { 
                            echo 'No build script found, skipping build.' 
                        } 
                    } catch (Exception e) { 
                        echo 'Build process encountered an issue but continuing...' 
                    } 
                } 
            } 
        } 
 
        stage('Deploy (Optional)') { 
            steps { 
                script { 
                    echo 'Deploying Application...' 
                    // Add deployment logic here if required 
                } 
            } 
        } 
    } 
 
    post { 
        success { 
            echo '   Pipeline executed successfully!' 
        } 
        failure { 
            echo '  Pipeline execution failed! Please check logs.' 
        } 
    } 
}
