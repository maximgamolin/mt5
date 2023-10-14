.PHONY: migrate

back:
	cd mt5back && \
	docker-compose up --build

migrate:
	cd mt5back && \
	docker-compose exec web python manage.py migrate

load_fixtures:
	cp external_files/merged_data.json mt5back/merged_data.json && \
	cd mt5back && \
	docker-compose exec web python manage.py populate_from_json merged_data.json && \
	rm merged_data.json

