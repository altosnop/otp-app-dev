const express = require('express');
const otpGenerator = require('../functions/otpGenerator');
const dateCompare = require('../functions/dateCompare');
const OtpModel = require('../models/otp-model');
const router = express.Router();
const fs = require('fs');

router.post('/otp-generate', async (req, res) => {
  try {
    const code = otpGenerator();

    const date = new Date();
    date.setDate(date.getDate() + 30);
    const expireAt = date.toISOString().split('T')[0];

    const fileName = req.body.fileName;
    const description = req.body.description;

    const candidate = await OtpModel.findOne({ code });
    if (candidate) {
      return res.status(400).json({ message: 'Пароль уже существует' });
    }
    await OtpModel.create({ code, fileName, description, expireAt });
    res.send({
      code: code,
      message: 'Пароль создан',
    });
  } catch (error) {
    res.status(500).send({ message: 'Что-то пошло не так, попробуйте снова' });
    console.log(error);
  }
});

router.post('/otp-verify', async (req, res) => {
  try {
    const code = req.body.code;
    const otp = await OtpModel.findOne({ code });

    // const currentDate = new Date().toISOString().split("T")[0];
    // const date = dateCompare(otp.expireAt, currentDate);

    if (!otp) {
      res.send({
        valid: false,
        message: 'Перевірте правильність введення пароля',
      });
    } else if (otp.isActivated === true) {
      res.send({
        valid: false,
        message: 'За цим паролем файл вже був завантажений',
      });
      // } else if (otp && !date) {
      //   res.send({
      //     valid: false,
      //     message: "Пароль прострочений зверніться до автора файлу",
      //   });
    } else {
      res.send({
        valid: true,
        code: otp.code,
        fileName: otp.fileName,
        expireAt: otp.expireAt,
        description: otp.description,
      });
    }
  } catch (error) {
    res.status(500).send({ message: 'Что-то пошло не так, попробуйте снова' });
    console.log('Пароль введен неправильно');
  }
});

router.post('/otp-activate', async (req, res) => {
  try {
    const code = req.body.code;
    const otp = await OtpModel.findOne({ code });

    if (!otp) {
      res.status(500).send({
        message: 'Пароль не найден',
      });
    } else {
      otp.isActivated = true;
      await otp.save();
    }
  } catch (error) {
    res.status(500).send({
      message: 'Что-то пошло не так, попробуйте снова',
    });
    console.log(error);
  }
});

router.delete('/otp-delete/:code', async (req, res) => {
  try {
    const code = req.params.code;
    const otp = await OtpModel.findOne({ code });

    if (!otp) {
      res.status(400).send({ message: 'Такого пароля не существует' });
      console.log('Ошибка при удалении');
    } else {
      await otp.remove();
      res.send({
        message: 'Пароль успешно удален',
      });
    }
  } catch (error) {
    res.status(500).send({ message: 'Что-то пошло не так, попробуйте снова' });
    console.log(error);
  }
});

router.delete('/files/delete/:name', (req, res) => {
  const fileName = req.params.name;
  const directoryPath = `${__dirname}/../files/blik_files/`;

  fs.unlink(directoryPath + fileName, (error) => {
    if (error) {
      console.log(error);
    } else {
      res.send({
        message: 'Файл успешно удален',
      });
    }
  });
});

router.get('/codes', async (req, res) => {
  try {
    OtpModel.find().then((codes) => res.json(codes));
  } catch (error) {
    res.status(500).send({ message: 'Что-то пошло не так, попробуйте снова' });
    console.log(error);
  }
});

router.post('/upload', (req, res) => {
  if (!req.files) {
    return res.status(500).send({ message: 'Файл не найден' });
  }
  const myFile = req.files.file;
  myFile.mv(`${__dirname}/../files/blik_files/${myFile.name}`, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: 'Ошибка при загрузке файла' });
    }
  });
});

router.get('/files', async (req, res) => {
  const directoryPath = `${__dirname}/../files/blik_files/`;

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: 'Не удается найти файлы',
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: `${__dirname}/../files/blik_files/${file}`,
      });
    });
    res.status(200).send(fileInfos);
  });
});

router.get('/files/download/:name', (req, res) => {
  try {
    const fileName = req.params.name;
    const directoryPath = `${__dirname}/../files/blik_files/`;
    res.download(directoryPath + fileName, fileName);
  } catch (error) {
    res.status(500).send({ message: 'Что-то пошло не так, попробуйте снова' });
    console.log(error);
  }
});

module.exports = router;
