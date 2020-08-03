DOCKER_CMP_COMMAND=docker-compose
DOCKER_CMP_COMMAND_EXEC=$(DOCKER_CMP_COMMAND) exec 

runserver:
	$(DOCKER_CMP_COMMAND) up --build

shutdown:
	$(DOCKER_CMP_COMMAND) down
