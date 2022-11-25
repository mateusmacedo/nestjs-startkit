CONTAINER_NAME=nestjs-startkit

up:
	docker-compose up -d

down:
	docker-compose down
	docker-compose rm -f

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
