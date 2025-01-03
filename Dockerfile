# Используем базовый образ Python
FROM python:3.9-slim

# Установка зависимостей для Python
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Установка рабочей директории
WORKDIR /app

# Копирование файла зависимостей Python
COPY requirements.txt ./ 

# Установка зависимостей Python
RUN pip install --no-cache-dir -r requirements.txt

# Копирование всех остальных файлов проекта
COPY ./ ./ 

# Настройка статических файлов Django (если необходимо)
RUN python manage.py collectstatic --noinput

# Экспонируем порт 8000
EXPOSE 8000

# Запуск приложения с Gunicorn
CMD ["gunicorn", "myproject.wsgi:application", "--bind", "0.0.0.0:8000"]
