services:
  trustcrow-db:
    image: postgres
    restart: always
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_DB: trustcrowdb
      POSTGRES_USER: postgres
    volumes:
      - trustcrow-db:/var/lib/postgresql/data
    ports:
      - 5432:5432

  trustcrow-test-db:
    image: postgres
    restart: always
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_DB: trustcrowdb_test
      POSTGRES_USER: postgres
    volumes:
      - trustcrow-test-db:/var/lib/postgresql/data
    ports:
      - 5433:5432

volumes: 
  trustcrow-db:
  trustcrow-test-db:
