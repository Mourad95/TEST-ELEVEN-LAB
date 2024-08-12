build:
	@docker-compose -f frontend/docker-compose.yml build
	@docker-compose -f backend/docker-compose.yml build

first:
	@docker exec backend-server-eleven-test-1 npm run migrate
	@docker exec backend-server-eleven-test-1 npm run seed



start-front:
	@docker-compose -f frontend/docker-compose.yml up -d

start-back:
	@docker-compose -f backend/docker-compose.yml up -d

stop-front:
	@docker-compose -f frontend/docker-compose.yml down

stop-back:
	@docker-compose -f backend/docker-compose.yml down

restart-front: stop-front start-front

restart-back: stop-back start-front

start-all: start-back start-front

restart-all: stop-back stop-front start-back start-front

delete:
	@docker-compose -f frontend/docker-compose.yml down -v
	@docker-compose -f backend/docker-compose.yml down -v
