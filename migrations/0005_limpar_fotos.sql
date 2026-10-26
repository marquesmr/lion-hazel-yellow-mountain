-- Data-URL profile photos made the session cookie larger than Cloudflare allows.
update "user" set image = null
where image is not null and (image like 'data:%' or char_length(image) > 500);
