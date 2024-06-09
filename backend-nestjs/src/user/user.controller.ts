import { Controller, Get, Post, Body, Param, Delete, Put, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import PDFDocument from 'pdfkit';

@Controller('api/users') // Define the base route for this controller
export class UserController {
  constructor(private readonly userService: UserService) {}


@Get('generate-pdf')
generatePDF(@Res() res: Response) {
  const doc = new PDFDocument();
  let filename = 'users.pdf';
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  doc.pipe(res);
  this.userService.getUsers().forEach(user => {
    doc.text(`Name: ${user.name}`);
    doc.text(`Email: ${user.email}`);
    doc.text(`Phone: ${user.phone}`);
    doc.text(`Address: ${user.address}`);
    doc.moveDown();
  });
  doc.end();
}

@Get('retrieve-pdf')
retrievePDF(@Res() res: Response) {
  const doc = new PDFDocument();
  let filename = 'users.pdf';
  res.setHeader('Content-Disposition', `inline; filename=${filename}`);
  doc.pipe(res);
  this.userService.getUsers().forEach(user => {
    doc.text(`Name: ${user.name}`);
    doc.text(`Email: ${user.email}`);
    doc.text(`Phone: ${user.phone}`);
    doc.text(`Address: ${user.address}`);
    doc.moveDown();
  });
  doc.end();
}


  @Post()
  addUser(@Body() user: any) {
    return this.userService.addUser(user);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() user: any) {
    return this.userService.updateUser(+id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    this.userService.deleteUser(+id);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
}
