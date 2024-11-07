import { Server } from "socket.io";

export default function handler(_req, res) {
    if (res.socket?.server.io) {
        console.log('Socket is already running')
    } else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connection', socket => {
            socket.on('emit-add-patient', newPatient => {
              socket.broadcast.emit('add-patient', newPatient)
            })

            socket.on('emit-remove-patient', patientId => {
              socket.broadcast.emit('remove-patient', patientId)
            })
          })
    }
    res.end()
}