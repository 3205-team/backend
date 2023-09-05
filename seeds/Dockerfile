FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongodb --db sanghun --collection userdocuments --type json --file /init.json --jsonArray