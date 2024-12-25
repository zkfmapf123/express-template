test:
	@curl -i -X POST -H "Content-Type: application/json" -d '{"name":"test"}' http://localhost:3000/test