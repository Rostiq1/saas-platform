
# Используем базовый образ Python
FROM python:3.9-slim

# Установка зависимостей для React и Python
RUN apt-get update && apt-get install -y \    build-essential \    curl \    nodejs \    npm \    && rm -rf /var/lib/apt/lists/*

# Установка директории приложения
WORKDIR /app

# Копирование файлов приложения
COPY requirements.txt ./
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

# Установка зависимостей Python
RUN pip install --no-cache-dir -r requirements.txt

# Установка зависимостей React
RUN npm install && npm run build

# Настройка статических файлов Django
RUN python manage.py collectstatic --noinput

# Экспонируем порт 8000
EXPOSE 8000

# Запуск приложения
CMD ["gunicorn", "project_name.wsgi:application", "--bind", "0.0.0.0:8000"]
