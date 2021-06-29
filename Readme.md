## Wrote a Seeder to automatically import a bootcamp data

    import seeder with: node seeder -i
    delete seeder with: node seeder -d

## Filtering using req.query

    await Record.find(req.query)
    This is not the best way to filter. we can filter records like below:
    http://localhost:5000/api/v1/bootcamps/regex?averageCost[lte]=10000

## Filtering using regex

    let queryStr = queryStr.stringify(req.query)
    queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, match => `$${match}`)
    const records = await Record.find(JSON.parse(queryStr))
    res.status(200).json({success: true, count: records.length, data: records})

## Select, Sort, and Filter Records
