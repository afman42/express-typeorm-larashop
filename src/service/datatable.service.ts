import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";

declare var sqlData: any;
declare var sqlFilterCount;
declare var sqlCount;
declare var typeData: TypeDatatable
declare var resp: any

interface TypeDatatable {
    draw: any
    search: {
        value: any
    }
    length: any
    start: any
    columns: {
        order: [
            column: {
                data: any
            },
            dir: {
                data: any
            }
        ]
    }
    order: [
        dir: any
    ]

}

const datatableUser = async (req: Request, res: Response, tables: string, cari: Array<string>, isWhere: Array<string> | null) => {
    try {
        var typeData = req.query as any
        // var typeData = req.body as any
        var resp = res
        let requestSearch = typeData.search.value

        let search = escapeHtml(requestSearch)

        let requestLength = typeData.length
        let requestStart = typeData.start

        let limit = parseInt(requestLength.replace('("/[^a-zA-Z0-9.]/', ''))
        let start = parseInt(requestStart.replace('("/[^a-zA-Z0-9.]/', ''))

        let query = tables;
        let sqlIsWhereCount, sqlCounts;
        var sqlCount;
        if (isWhere != null) {
            sqlIsWhereCount = await getRepository(User).query(`SELECT COUNT(*) as total FROM users WHERE ${isWhere[0]} = ${isWhere[1]}`)
        } else {
            sqlCounts = await getRepository(User).query(`SELECT COUNT(*) as total FROM ${query}`)
        }

        sqlCount = isWhere != null ? sqlIsWhereCount : sqlCounts;

        // let cariSearch = " judul LIKE '%" + search + "%' OR " + "judul  LIKE '%" + search + "%'";
        let cariSearch = cari.join(" LIKE '%" + search + "%' OR ") + "  LIKE '%" + search + "%'";
        // $cari = implode(" LIKE '%".$search."%' OR ", $cari)." LIKE '%".$search."%'";

        // let requestOrderField = typeData.order[0].column
        // Untuk mengambil nama field yg menjadi acuan untuk sorting

        // Untuk menentukan order by "ASC" atau "DESC"
        let requestAscdesc = typeData.order[0].dir
        // console.log(typeData.order[0]);
        // console.log(typeData.columns);
        // let requestOrder =  request.input(`columns.${requestOrderField}.data`);
        // let requestOrder = typeData.columns.order[0].column.data
        let requestOrder = typeData.columns[typeData.order[0].column].data
        // $order = " ORDER BY ".$_POST['columns'][$order_field]['data']." ".$order_ascdesc;
        var sqlData: any;
        if (isWhere != null) {
            sqlData = await getRepository(User).query(`SELECT * FROM ${query} WHERE ${isWhere[0]} = ${isWhere[1]} AND (${cariSearch}) ORDER BY ${requestOrder} ${requestAscdesc} LIMIT ${limit} OFFSET ${start}`);
        } else {
            sqlData = await getRepository(User).query(`SELECT * FROM ${query} WHERE (${cariSearch}) ORDER BY ${requestOrder} ${requestAscdesc}  LIMIT ${limit} OFFSET ${start}`)
        }

        let sqlCari;
        var sqlFilterCount;
        if (search != "") {
            if (isWhere != null) {
                // sqlCari = await Database.query().from(query).whereRaw('?? = ?', [isWhere[0], isWhere[1]]).whereRaw('( ? )',[cariSearch]).count('* as Filtertotal')
                sqlCari = await getRepository(User).query(`SELECT COUNT(*) as Filtertotal FROM ${query} WHERE ${isWhere[0]} = ${isWhere[1]} AND (${cariSearch})`)
            } else {
                // sqlCari = await Database.query().from(query).whereRaw('( ? )', [cariSearch]).count('* as Filtertotal')
                sqlCari = await getRepository(User).query(`SELECT COUNT(*) as Filtertotal FROM ${query} WHERE (${cariSearch})`)
            }
            sqlFilterCount = sqlCari;
        } else {
            if (isWhere != null) {
                // sqlCari = await Database.query().from(query).whereRaw('?? = ?', [isWhere[0], isWhere[1]]).count('* as Filtertotal');
                sqlCari = await getRepository(User).query(`SELECT COUNT(*) as Filtertotal FROM ${query} WHERE ${isWhere[0]} = ${isWhere[1]}`)
            } else {
                // sqlCari = await Database.query().from(query).count('* as Filtertotal');
                sqlCari = await getRepository(User).query(`SELECT COUNT(*) as Filtertotal FROM ${query}`)
            }
            sqlFilterCount = sqlCari
        }

        let data = sqlData;
        console.log(data);
        let callback = {
            'draw': typeData.draw, // Ini dari datatablenya    
            'recordsTotal': sqlCount[0].total,
            'recordsFiltered': sqlFilterCount[0].Filtertotal,
            'data': data
        };
        // return res.json(callback)
        resp.json(callback)
    } catch (error) {
        console.log(error)
    }
}

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}
export {
    datatableUser
}