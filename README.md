Запуск бека на 8000 порту
```
 cd mt5back && docker-compose up
```

Запуск миграций (перед запуском нужно поднять бек)
```
 cd mt5back && make migrate
```