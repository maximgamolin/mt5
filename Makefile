.PHONY: migrate

back:
	cd mt5back && \
	docker-compose up --build

makemigrations:
	cd mt5back && \
	docker-compose exec web python manage.py makemigrations

migrate:
	cd mt5back && \
	docker-compose exec web python manage.py migrate

clean_db:
	cd mt5back && \
	docker-compose exec web python manage.py clean_full_db

offices:
	cp external_files/offices.json mt5back/offices.json && \
	cd mt5back && \
	docker-compose exec web python manage.py populate_offices_from_json offices.json && \
	rm offices.json

atms:
	cp external_files/atms.json mt5back/atms.json && \
	cd mt5back && \
	docker-compose exec web python manage.py populate_atms_from_json atms.json && \
	rm atms.json

branchload:
	cd mt5back && \
	docker-compose exec web python manage.py generate_branchload


operations:
	cp external_files/office_function.json mt5back/office_function.json && \
	cd mt5back && \
	docker-compose exec web python manage.py populate_operations_from_json office_function.json && \
	rm office_function.json


prepare: migrate clean_db offices atms branchload operations
