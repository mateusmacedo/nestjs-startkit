CONTAINER_NAME=nestjs-startkit

up:
	docker-compose up -d

down:
	docker-compose down
	docker-compose rm -f

logs:
	docker-compose logs --follow

bash:
	make up
	docker exec -it $(CONTAINER_NAME) sh

lint:
	make up
	docker exec -it $(CONTAINER_NAME) npm run lint

build:
	docker-compose build

.PHONY: database
database:
	docker-compose up -d mongo

.PHONY:test
test:
	make up
	docker exec -it $(CONTAINER_NAME) npm run test
	make down

.PHONY:coverage
coverage:
	make up
	docker exec -it $(CONTAINER_NAME) npm run test:cov
	make down

.PHONY:e2e
coverage:
	make up
	docker exec -it $(CONTAINER_NAME) npm run test:e2e
	make down
