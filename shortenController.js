const crypto = require('crypto');
const client = require('./dataBaseClient');

class ShortenController {
    create(req, res) {
        if (!req.body.url) {
            res.status(400).json('you need send me url')
        }

        Promise.resolve().then(
            () => {
                return new URL(req.body.url)
            }
        ).then((url) => {
            return url;
        }, () => {
            return new URL('http://' + req.body.url)
        }).then((url) => {
            const shortcode = crypto.randomBytes(6).toString('hex');
            return client.set(shortcode, url.toString(), (err, reply) => {
                if (err) console.log(err);
                console.log(reply);
            }).then(() => shortcode);
        }).then((shortcode) => {
            res.json({
                shortcode,
                redirect: req.protocol + '://' + req.get('host') + req.baseUrl + '/' + shortcode
            });
        }).catch((e) => {
            res.status(400).json('you need send me valid url address. example - http://google.com')
        })

    }

    search(req, res) {
        const { shortcode } = req.params;

        client.get(shortcode)
            .then((url) => {
                if (!url) {
                    return res.status(404).json('url not found');
                }
                res.status(302).redirect(url);
            })
            .catch((e) => {
                res.status(400).json(e);
            });
    }
}

module.exports = new ShortenController()