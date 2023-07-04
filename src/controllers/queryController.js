'use strict'

require('array.prototype.flatmap').shim()

const client = require('../config/elastic')

const CREATE = async (req, res) => {
  const { index, properties } = req.body
  await client.indices.create({
    index,
    body: {
      mappings: {
        properties
      }
    }
  }, { ignore: [400] })

  res.status(200).json({ msg: 'Criação realizada com sucesso!' })
}

const SELECT = async (req, res) => {
  let result = {}
  try {
    result = (await client.search(req.body)).body.hits
  } catch (err) {
    console.log(err)
  }
 
  res.json(result)
}

const INSERT = async (req, res) => {
  const { index, data } = req.body
  const body = data.flatMap(doc => [{ index: { _index: index } }, doc])
  const { body: result } = await client.bulk({ refresh: true, body })
  res.json(result)
}

const UPDATE = async (req, res) => {
  let result = await client.updateByQuery(req.body)
  res.json(result)
}

const DELETE = async (req, res) => {
  let result = {}
  try {
    result = await client.deleteByQuery(req.body)
  } catch (err) {
    console.log(err)
  }

  res.json(result)
}

const SQL = async (req, res) => {
  const result = await client.sql.query(req.body)
  res.json(result)
}

module.exports = {
  CREATE,
  SELECT,
  INSERT,
  UPDATE,
  DELETE,
  SQL
}