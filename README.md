## Twitter to Markdown

Twitter to Jekyll-compatible Markdown files converter with @ and # autolinking and short URL resolving.

### Usage

1. Get the code

```
git clone https://github.com/kristjanjansen/twitter_to_markdown.git
cd twitter_to_markdown
```

2. Install modules

```
npm install
```

3. Create ```config/default.json``` file and fill the values from https://dev.twitter.com

{
  "consumer_key": "",
  "consumer_secret": "",
  "access_token_key" : "",
  "access_token_secret": "",
  "screen_name": ""  
}

4. Run

```
node ttm.js --path=where/to/put/md/files --count=20
```

Note that ```--path``` and ```--count``` are both optional, see the source for defaults.

