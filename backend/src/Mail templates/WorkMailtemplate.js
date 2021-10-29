const WorkMailtemplate = (Assignedby, room_name, time, content, due) =>
    `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    
    <body style="margin:0;padding:50px;font-family: monospace;background-color: #f5f5f5;">
        <div style="background-color: #f5f5f5;">
            <h1 style="text-align:center;font-size:45px">Announcement</h1>
            <br />
            <div style="max-width: 800px;margin:10px auto;margin-top:50px;margin-bottom:20px;border-radius:10px">
                <div style="font-size:25px">
                    New work has been assigned to you by ${Assignedby} on ${room_name} at ${time}
                </div>
                <div style="background-color:dodgerblue;color:white;padding:10px;border-radius: 10px;margin-top: 30px;">
                    <div style="font-size:25px">${content.title}<div>
                            <div style="font-size:20px;padding:20px">${content.description}<div>
                                </div>
                            </div>
    
                        </div>
    
                    </div>
                </div>
                <div style="display:flex;flex-direction:row;justify-content:space-between;margin-top:30px">
                    <div></div>
                    <div style="font-size:18px">Due Date: ${due}</div>
                </div>
    </body>
`
module.exports = WorkMailtemplate;