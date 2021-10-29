const teacherinvitation = (invited_teacher_name,room_name,room_id,link) => `
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
            <h1 style="text-align:center;font-size:45px">Invitation</h1>
            <br />
            <div style="max-width: 600px;margin:10px auto;margin-top:50px">
                <h4 style="font-size: 30px;">
                    Dear ${invited_teacher_name},
                </h4>
                <div style="font-size:25px">
                    You have been invited to join the following class "${room_name}"
                </div>
                <a href="${link}">
                <div style="text-align: center;">
                    <button style="font-family: monospace;padding: 10px 30px;background-color: green;color: white;border-radius: 10px;border:none;font-size: 16px;cursor:pointer;margin-top: 50px;"
                    onclick="openlink()">JOIN</button>
                </div>
                </a>
            </div>
        </div>
        <script type="text/javascript">
        function openlink(){
            window.open("${link}","_blank");
        }
        </script>
    </body>
`
module.exports = teacherinvitation 