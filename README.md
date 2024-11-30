# omnivore-export-organizer
Sort articles from an Omnivore export by label

A script that receives an Omnivore export directory and outputs a JSON file containing a label-based object.

Omnivore export structure:
```
omnivore_export
├── content
│   └── HTML files
├── highlights
│   └── Markdown files
├── metadata_0_to_20.json
├── metadata_1000_to_1020.json
├── metadata_100_to_120.json
├── .
├── .
├── .
└── metadata_980_to_1000.json
```

The `content` directory contains your library in HTML files. 

The `highlights` directory contains your highlights in markdown files. 

If you want to organize the exported chaos by label, these directories aren’t very helpful.

The `metadata_.json` files each contain an array of (up to) 20 objects, where each object contains one URL from your library along with it’s associated metadata:

```json
{
    "id": "4a569d47-4c08-42e4-96ad-c7c296b83e7d",
    "slug": "https-www-theverge-com-2024-10-29-24283055-one-of-my-favorite-read-later-apps-is-shutting-down",
    "title": "One of my favorite read-later apps is shutting down.",
    "description": "I’ve recommended Omnivore a lot to people looking for a place to save articles, PDFs, and other stuff to read later. Now the app’s going away, since Omnivore has been acquired by ElevenLabs.",
    "author": "David Pierce",
    "url": "https://www.theverge.com/2024/10/29/24283055/one-of-my-favorite-read-later-apps-is-shutting-down",
    "state": "Active",
    "readingProgress": 0,
    "thumbnail": "https://cdn.hashnode.com/res/hashnode/image/upload/v1730908679140/f7c2ff53-9d06-4b2f-ae08-baaf219cba1f.png",
    "labels": [
      "readLater"
    ],
    "savedAt": "2024-10-30T14:35:35.081Z",
    "updatedAt": "2024-10-30T14:35:35.877Z",
    "publishedAt": null
  },
```

The script loops over all the `metadata_.json` files and outputs a JSON file containing an object with a property for each label, where each label is an array containing all of the URLs that were labeled with said label. The `noLabels` array contains all the URLs that weren’t labeled.

Note: If a URL has `X` labels, it will be placed into `X` different label arrays.

Here’s what the object will look like:

```json
[
	{
		"readLater": [
			"https://www.save.day/blog-posts/delicious-social-bookmarking-website",
			"https://fortelabs.com/blog/the-secret-power-of-read-it-later-apps/",
			"https://blog.omnivore.app/p/details-on-omnivore-shutting-down"
		],
		"rip": [
			"https://del.icio.us",
			"https://www.diigo.com/",
		],
		"omnivoreReplacements": [
			"https://raindrop.io/",
			"https://getpocket.com/",
			"https://www.instapaper.com",
			"https://goodlinks.app/",
		],
		.
		.
		.
		"noLabels": [
			"https://www.stumbleupon.com/",
			"https://techcrunch.com/",
			"https://thenextweb.com/"
		]
	}
]
```

