var tutorial1='<b>SQL Tutorial 1: Table Creation</b>'+
'<h2>Table Creation : </h2>'+
'<p>The first thing that should be done is to create a table we can use to store information in.  To do this we start with the CREATE TABLE command followed by your TABLE NAME.  Together it will look something like this: <br>'+
'CREATE TABLE EMPLOYEE <br>'+
'Followed by this command you will want an open and close parenthesis following it, with a semicolon outside of the close parenthesis.  Unlike C++, SQL uses parenthesis to house commands for its functions'+
'.  This will look something like this: <br><br>'+
'CREATE TABLE EMPLOYEE(<br>);<br><br>'+ 'The EMPLOYEE table will not be very useful though since we didn’t add any sort of data values inside it.  A table can hold many types of data such as:'+ 
'Integers, Floats, Characters, Booleans, and many more.  So once we add a few data types the table creation command will look something more like this:<br> '+
'<br><p style ="padding-right :5px"> CREATE TABLE EMPLOYEE('+
    '<br>   EMPLOYEE_ID	        INTEGER,'+
	'<br>   NAME	    	    VARCHAR(80),' +
	'<br>   GENDER		        CHAR(1),' +
	'<br>   SALARY		        INTEGER,' +
	'<br>   DEPTNO		        INTEGER' +
'<br>);</p>'+
'Your data types should be separated by commas, except for the last variable.  It should not have a comma after it, and instead just lead straight into the closing parenthesis.<br>'+  
'You may have noticed that this table might cause problems though.  What is stopping an employee from having duplicate IDs?    Or no ID at all?  That’s where constraints come in.' +
'When you’re declaring these variables it is likely that you may want to put some constraint on them, such as the NOT NULL constraint.  To do this, you simply add the type of constraint you'+ 
'would like your variable to have after the variable type.  That will look like this:<br>' +
'CREATE TABLE EMPLOYEE('+
	'<br>EMPLOYEE_ID	INTEGER NOT NULL,'+
	'<br>NAME			VARCHAR(80),'+
	'<br>GENDER		    CHAR(1),'+
	'<br>SALARY		    INTEGER NOT NULL,'+
	'<br>DEPTNO		    INTEGER'+
'<br>);' +
'<br>Now each employee must have an ID and SALARY, these fields cannot be NULL.  However, it is still possible that there are duplicate EMPLOYEE_IDs.  To fix this, we will' + 
'need to add some other constraint.  Since EMPLOYEE_ID seems like a reasonable PRIMARY KEY, let’s add that constraint.  There are two ways we can do this:'+
'<br>CREATE TABLE EMPLOYEE('+
	'<br>EMPLOYEE_ID	INTEGER PRIMARY KEY,'+
	'<br>NAME			VARCHAR(80),'+
	'<br>GENDER		    CHAR(1),'+
	'<br>SALARY		    INTEGER NOT NULL,'+
	'<br>DEPTNO		    INTEGER'+
'<br>);'+
'<br>'+
'<br>CREATE TABLE EMPLOYEE('+
	'<br>EMPLOYEE_ID	INTEGER,'+
	'<br>NAME			VARCHAR(80),'+
	'<br>GENDER		    CHAR(1),'+
	'<br>SALARY		    INTEGER NOT NULL,'+
    '<br>DEPTNO		    INTEGER,'+
    '<br>PRIMARY_KEY(EMPLOYEE_ID)'+
'<br>);'+
'<br> Both of these versions have the same effect.  However, if we wanted to have a compound key,'+ 
'then we would have to use the second version instead.  Let’s say we wanted EMPLOYEE_ID and NAME to be the compound key.  We would have to do this:<br>'+
'<br>CREATE TABLE EMPLOYEE('+
	'<br>EMPLOYEE_ID	INTEGER,'+
	'<br>NAME			VARCHAR(80),'+
	'<br>GENDER		    CHAR(1),'+
	'<br>SALARY		    INTEGER NOT NULL,'+
    '<br>DEPTNO		    INTEGER,'+
    '<br>PRIMARY_KEY(EMPLOYEE_ID, NAME)'+
'<br>);'+
'When declaring a PRIMARY KEY the tag PRIMARY KEY can’t appear next to two separate variables.  That would make two variables the primary key, which can’t happen.  When you declare it, as shown above,'+ 
'it pairs the two variables together as a compound key, which we can have.<br>'+
'Now, how do we make foreign keys?  Well, let’s imagine that we want DEPTNO to reference a different table.  Let’s say we want it to reference DEPTNO from a table called DEPARTMENT.'+  
'Well, then we’d have to use the FOREIGN KEY and REFERENCES tags.  It would look like this:<br>'+
'<br>CREATE TABLE EMPLOYEE('+
'<br>EMPLOYEE_ID	INTEGER,'+
'<br>NAME			VARCHAR(80),'+
'<br>GENDER		    CHAR(1),'+
'<br>SALARY		    INTEGER NOT NULL,'+
'<br>DEPTNO		    INTEGER,'+
'<br>FOREIGN_KEY(DEPTNO) REFERENCES DEPARTMENT'+
'<br>);'+
'<br>So it looks like this: FOREIGN KEY (variable name) REFERENCES TABLENAME';

var tutorial2 = '<b>SQL Tutorial 2: Table Operations</b>'+
'<h2>Table Operations : </h2><br>'+
'<p><br>Insertion, Deletion, and Update Table:  We’ve created a table, but a table isn’t going to get us many places without data inside of it.  This can be remedied using the INSERT operation.' +  
'There are a few ways to insert data into a table that we will cover in this tutorial.<br>'+ 
'Insert Into Employee Values(050, ‘James’ ‘M’, 20000, 01);'+
'Using this method of insertion is rather simple.  You insert values into the Employee table in the same order that they were declared in the table itself.'+  
'So the Employee ID is 050, the name is James, sex is ‘M’, salary is 20000, and he works in department 01.<br>' +

'What if we only want to insert a few values into the table?  Well, to do this we would have to specify which values we wanted to insert before we jump into declaring the values.' + 
'So that’s going to look like this:<br><br>'+
'Insert Into Employee(EMPLOYEE_ID, SALARY) Values(060, 50000)<br><br>'+
'We declared that we only want to enter values into Employee ID and Salary before entering the values.  When we do this, all other values become NULL, so make sure you aren’t validating'+ 
'any NOT NULL constraints when you use this Insertion operator.<br><br>'+
'Now that we’ve inserted rows it’s likely we’ll want to delete them at some point.  This is just as simple as insertion, and looks like this:<br><br>'+
'DELETE FROM Employee WHERE id = 050;<br><br>'+
'So we’re deleting a ROW from the employee table WHERE the employee has an id of 50.  If you leave out the WHERE and just do DELETE FROM EMPLOYEE then you will remove all records from the Employee table.'+  
'You can also use conditionals in your deletion statement such as this:<br><br>'+
'DELETE FROM EMPLOYEE WHERE SALARY > 40000<br><br>'+
'This will remove any employee form the employee table who has a salary greater than 40000.<br>'+ 
'At some point, you will want to change a value rather than delete it.  This can be done with the UPDATE command.<br>' +
'It has similar syntax to the other commands:' +
'<br>UPDATE EMPLOYEE '+
'<br>   SET SALARY = 20000'+
'<br>   WHERE SALARY > 20000;<br><br>'+
'This is a simple command.  If an employee in the employee table has a salary that exceeds 20000 it sets the salary to 20000.'+  

'<br><b>Question:</b><br>'+

'<br>Insert Into Employee Values(050, ‘James’ ‘M’, 20000, 01);'+
'<br>Insert Into Employee(EMPLOYEE_ID, SALARY) Values (020, 100000);'+
'<br>UPDATE EMPLOYEE'+
	'<br>   SET SALARY = 100000'+
	'<br>   WHERE SALARY < 100000;'+
'<br>DELETE FROM EMPLOYEE;';
var tutorial3='<b>SQL Tutorial 3: Dropping Tables</b><br>'+
				'<p>Dropping Tables:  Should you ever need to get rid of a table you will use the DROP TABLE<br>'+
				'command.  There are a few ways to implement the drop command that we should discuss'+
				'<br><h3>DROP TABLE EMPLOYEE RESTRICT;</h3><br>	'+
				'When you add the RESTRICT tag to the end of your DROP command you are saying that the'+
				'table can only be deleted if it is not being referenced.  You should do this to assure that you are'+
				'not committing any referential integrity violations when you get rid of a table.<br>'+
				'<h3> DROP TABLE EMPLOYEE CASCADE</h3><br>'+
				'When you add CASCADE to the end of your DROP command'+
				' then SQL will go through each table that is referencing a value'+
				' in the table that is to be deleted and remove any tuple that references'+
				' the data in the table you wish to remove.  This can be dangerous however,'+
				' and you should be sure that this won’t cause any catastrophic failures'+
				' in your database before using this deletion method.</p>';