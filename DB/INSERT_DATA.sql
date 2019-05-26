DELETE from post_likes;
DELETE from post_hashtags;
DELETE from photo_post;
DELETE from user;

INSERT into user 
VALUES 
('uiNca3m', 'FoxPS'), 
('jKavoPz', 'Alexey'), 
('54oILacX', 'Vasya'), 
('734vrASD', 'UITest'), 
('casgMJ3H', 'RandomGuy');

INSERT into photo_post 
VALUES 
('idac23fhrkm', 'Лисица окунhelloулась в снег.', '19.02.14', 'https://im0-tub-by.yandex.net/i?id=245bc235e900a847edae8e53e39f50b3-l&n=13', 'uiNca3m'), 
('cbdlN65H', 'Лаванда?', '19.05.24', 'https://s1.1zoom.ru/big0/788/Lavandula_Fields_Blue_525422_1280x778.jpg', '734vrASD'),
('54yutgifsdio', 'Какой красавчик. Я о пончике.', '19.04.15', 'https://whitestardonuts.ru/blog/wp-content/uploads/2018/11/main.jpeg', '54oILacX'),
('3fsdbf32647r', 'Дефолтное описание 1', '18.07.23', 'https://banana.by/uploads/thumbs/267/266083.jpg', '734vrASD'),
('db87dfvvgsdays', 'Дефолтное описание 2', '19.01.16', 'https://img.tsn.ua/cached/1533905776/tsn-db9ef401efc93a5fd1b676cd38abbef3/thumbs/1200x630/d0/5d/cf763cc5e1a91a2e62f7610dcb395dd0.png', 'casgMJ3H'),
('asd7gq8ac', 'Дефолтное описание 3', '18.09.09', 'http://komotoz.ru/photo/priroda/photos/samye_krasivye_mesta/samye_krasivye_mesta_24.jpg', 'jKavoPz'),
('v9aspcaisocy7', 'Дефолтное описание 4', '19.05.09', 'http://bygaga.com.ua/uploads/posts/2015-03/1425304690_krasivaya-podborka-siluetov-na-zakate-11.jpg', 'uiNca3m'),
('aa9cAaA27', 'Дефолтное описание 5', '19.03.03', 'https://cdn2.img.sputnik-georgia.com/images/23128/94/231289483.jpg', '734vrASD'),
('nasa78berAS', 'Дефолтное описание 6', '19.05.09', 'https://avatars.mds.yandex.net/get-pdb/51720/d29d1a69-e579-4544-90f6-9853ab4a509b/orig', 'uiNca3m'),
('3afbsfHVN9', 'Дефолтное описание 7', '19.05.09', 'http://greenword.ru/images/2014/03/img_531dc1375326a.jpg', '54oILacX');

INSERT into post_likes
VALUES
('89qfascpost_likesb', 'idac23fhrkm', 'jKavoPz'),
('213rgfajkslf', 'idac23fhrkm', '54oILacX'),
('gfd892123', 'cbdlN65H', 'uiNca3m'),
('43y7tignhsdfugv', 'cbdlN65H', 'casgMJ3H'),
('cu9sdy23fy78ds', 'asd7gq8ac', 'casgMJ3H'),
('dshvgbihSADncald', 'asd7gq8ac', 'jKavoPz'),
('savnksjf_SACd', '3afbsfHVN9', '54oILacX'),
('dsvn_kjLASNDO', '3afbsfHVN9', 'casgMJ3H'),
('_dcjvbIDD23vbs', '3afbsfHVN9', 'jKavoPz'),
('asfhgybdv_aF', '3afbsfHVN9', 'uiNca3m');

INSERT into post_hashtags
VALUES
('hruiotbh', 'idac23fhrkm', 'лис'),
('fgSDjacs2', 'idac23fhrkm', 'снег'),
('3tfuisda', 'idac23fhrkm', 'зима'),
('3fygaseytdc', 'cbdlN65H', 'smth'),
('asgcbysdicbsad', '3afbsfHVN9', 'smthnew'),
('advgis_bJ231LD', '3afbsfHVN9', 'wtf'),
('A_SHGCFOyi', '3afbsfHVN9', 'ftw');