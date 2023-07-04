To Generate Table:
```
{
	"index": "movies",
	"properties": {
		"id": {"type": "text"},
		"title": {"type": "text"},
		"writer": {"type": "text"},
		"fanchise": {"type": "text"},
		"synopsis": {"type": "text"},
		"year":  {"type": "integer"},
		"actors": {
			"properties": {
				"name": {"type": "text"}
			}
		}
	}
}
```


To insert Data:
```
{
	"index": "movies",
	"data": [{
			"title": "The Hobbit: An Unexpected Journey",
			"writer": "J.R.R. Tolkein year : 2012",
			"franchise": "The Hobbit"
		},
		{
			"title": "The Hobbit: The Desolation of Smaug writer : J.R.R. Tolkein",
			"year": 2013,
			"franchise": "The Hobbit"
		},
		{
			"title": "The Hobbit: The Battle of the Five Armies",
			"writer": "J.R.R. Tolkein year : 2012",
			"franchise": "The Hobbit",
			"synopsis":
				"Bilbo and Company are forced to engage in a war against an array of combatants and keep the Lonely Mountain"
		},
		{ "title": "Pee Wee Herman's Big Adventure" },
		{ "title": "Avatar" },
		{
			"title": "Fight Club",
			"writer": "Chuck Palahniuk",
			"year": 1999,
			"actors": [{"name": "Brad Pitt"}, {"name": "Edward Norton"}]
		},
		{
			"title": "Pulp Fiction",
			"writer": "Quentin Tarantino",
			"year": 1994,
			"actors": [{"name": "John Travolta"}, {"name":"Uma Thurman"}]
		},
		{
			"title": "Inglorious Basterds",
			"writer": "Quentin Tarantino",
			"year": 2009,
			"actors": [{"name": "Brad Pitt"}, {"name": "Diane Kruger"}, {"name": "Eli Roth"}]
		}
	]
}
```
To Select Entries:

All entries:
```
    {
	"index": "movies",
	"body": {
			"query": {
				"match_all": {}
		}
	}
    }
```
Based on attr:
```
    {
	"index": "movies",
	"body": {
			"query": {
				"match": {
					"attr": "value"
					...
				}
		}
	}
    }
```
Based on array attr:
```
	{
	"index": "movies",
	"body": {
			"query": {
				"bool": {
					"filter": [
						{ "match": {"array.attr": "value"} }
					]
				}
		}
	}
	}
```
To update an entrie:
Based on attr:
```
		{
		"index": "movies",
		"body": {
			"query": { "match": {"attr": "value"} },
			"script": {
				"lang": "painless",
				"source": "ctx._source['attr'] = 'value'"
			}
		}
	}
```
update on array: 
when array exists:
add:
```
	   {
		"index": "movies",
		"body": {
			"query": { "match": {"title": "Fight Club"} },
			"script": {
				"inline": "if(!ctx._source.actors.contains(params.actor)){ ctx._source.actors.add(params.actor) }",
				"params": {
					"actor": {"name": "Rubens Felix"}
				}
			}
		}
	  }
```
when array not exists:
```
	    {
		"index": "movies",
		"body": {
			"query": { "match": {"title": "Avatar"} },
			"script": {
				"inline": "ctx._source.actors = params.actor",
				"params": {
					"actor": {"name": "Rubens Felix"}
				}
			}
		}
	    }
```
remove:
```
  	{
		"index": "movies",
		"body": {
			"query": { "match": {"title": "The Hobbit: An Unexpected Journey"} },
			"script": {
				"inline": "if(ctx._source.actors != null) ctx._source.actors.removeIf(e -> e == params.actor)",
				"params": {
					"actor": {"name": "Diane Kruger"}
				}
			}
		}
	}
```
To delete an entrie:
Based on attr:
```
    {
	"index": "movies",
	"body": {
		"query": { "match": {"attr": "value"} }
	}
    }
```
Based on array attr:
```
    {
	"index": "movies",
	"body": {
			"query": {
				"bool": {
					"filter": [
						  { "match": {"array.attr": "value"} }
					]
				}
		}
	}
    }
```
  	
    
    
    	
