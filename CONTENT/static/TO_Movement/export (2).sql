CREATE OR REPLACE package generate_VIN as 

PROCEDURE VIN_generation(matnum IN VARCHAR2,ordernumber in VARCHAR2 DEFAULT null,username in VARCHAR2,VINOUT OUT SYS_REFCURSOR) ;

PROCEDURE INSERTVIN (matnum IN VARCHAR2,VIN IN VARCHAR2,ORDERNUMBER IN VARCHAR2,username in VARCHAR2,MODELNUMBER in VARCHAR2,COLOR in VARCHAR2,yearmodel in VARCHAR2);

PROCEDURE Record_Error(errorcode in VARCHAR2 DEFAULT null,errormessage in varchar2 default null) ;



end generate_VIN;
/


CREATE OR REPLACE package body generate_VIN as 

PROCEDURE VIN_generation( matnum IN VARCHAR2,ordernumber in VARCHAR2 DEFAULT null,username in VARCHAR2,VINOUT OUT SYS_REFCURSOR ) 
is 
 color varchar2(50);
 testvin varchar2(15);
 vininput varchar2(15);
 quantity varchar2(7);
 testvin2 varchar2(18);
 check_matnum EXCEPTION; 
 v_counter NUMBER := 1 ;
 TYPE YEARFORMAT IS TABLE OF VARCHAR2(5)
 INDEX BY VARCHAR2(5) ;
 YEAR1 YEARFORMAT;
 inputyear number :=1 ;
 elem CHAR;
 sum1 NUMBER := 0 ; 
 ninedig_value VARCHAR2(1) ;
 v_err_code NUMBER;
 V_err_msg VARCHAR2(200);
 vin varchar2(20);
 modelnumber varchar2(10);
 

 BEGIN
 --Lock the table explicitly to prevent concurrency issue
  LOCK TABLE zppcontrolvin IN EXCLUSIVE MODE;
  --To check whether the matnum is provided or not
  IF (matnum =''or matnum IS null) THEN
      raise check_matnum ;
      
  END IF;
  select '3SC'||LINEA||MODELO||DESPLAZAM||TRANSM  into vininput from ztppt_caract_rp where matnr=matnum;
  
  select substr(vininput,5,2)||despnomi into modelnumber from zppdesnomi where codinomi in (select DESPLAZAM from ztppt_caract_rp  where matnr=matnum);
  dbms_output.put_line('Model:'||modelnumber);
  select color  into color from ztppt_caract_rp where matnr=matnum;
  dbms_output.put_line('IC:'||inputyear||color);
  select anio  into inputyear from ztppt_caract_rp where matnr=matnum;
  dbms_output.put_line('IC:'||inputyear||color);
  --Fecthing the quantity to create the last 6 digit of VIN
 -- select max(LPAD(CONSECU+1,6,0)) into quantity from zppcontrolvin where (CODIGOLIN,CODIGOMOD,CODINOMI,CODITRANS,MATNR) in (select LINEA,MODELO,DESPLAZAM,TRANSM,MATNR  from ztppt_caract_rp where matnr=matnum);
 select max(LPAD(CONSECU+1,6,0))  into quantity from zppcontrolvin where MODELO in (select substr(matnr,1,5) from ztppt_caract_rp where matnr=matnum);
  IF (quantity =''or quantity IS null) THEN
      dbms_output.put_line('This specific material number does not have any existing VIN associated with it . ');
      dbms_output.put_line('Creating New Vin ');
      quantity:='000001';
  END IF;
  dbms_output.put_line('Consecu:'||quantity);
  vin := vininput;

  select translate(vininput,'ABCDEFGHJKLMNPRSTUVWXYZ','12345678123457923456789') into testvin from dual ;
  --YEAR EXTRACTION LOGIC
      YEAR1('2008') :='8';
      YEAR1('2009') :='9';
      YEAR1('2010') :='A';
      YEAR1('2011') :='B';
      YEAR1('2012') :='C';
      YEAR1('2013') :='D';
      YEAR1('2014') :='E';
      YEAR1('2015') :='F';
      YEAR1('2016') :='G';
      YEAR1('2017') :='H';
      YEAR1('2018') :='J';
      YEAR1('2019') :='K';
      YEAR1('2020') :='L';
      YEAR1('2021') :='M';
      YEAR1('2022') :='N';
      YEAR1('2023') :='P';
      YEAR1('2024') :='R';
      YEAR1('2025') :='S';
      YEAR1('2026') :='T';
      YEAR1('2027') :='V';
      YEAR1('2028') :='W';
      YEAR1('2029') :='X';
      YEAR1('2030') :='Y';
      YEAR1('2031') :='1';
      YEAR1('2032') :='2';
      YEAR1('2033') :='3';
      YEAR1('2034') :='4';
      YEAR1('2035') :='5';
      YEAR1('2036') :='6';
      YEAR1('2037') :='7';
      YEAR1('2038') :='8';
      YEAR1('2039') :='9';
      
      --inputyear := YEAR1.FIRST;
      dbms_output.put_line('Year Extracted :'||YEAR1(inputyear));
      testvin2 := testvin||translate(YEAR1(inputyear),'ABCDEFGHJKLMNPRSTUVWXYZ','12345678123457923456789')||'1'||quantity;
      --dbms_output.put_line(vin);
      --dbms_output.put_line('TestVin2'||testvin2);
      WHILE v_counter <=length(testvin2) loop
      elem := substr(testvin2, v_counter,1);
    CASE v_counter
     WHEN '1' THEN 
       sum1 := sum1+ elem*8;
     WHEN '2' THEN 
       sum1 := sum1+ elem*7;  
     WHEN '3' THEN 
       sum1 := sum1+ elem*6;  
     WHEN '4' THEN 
       sum1 := sum1+ elem*5;    
     WHEN '5' THEN 
       sum1 := sum1+ elem*4; 
      WHEN '6' THEN 
       sum1 := sum1+ elem*3;   
      WHEN '7' THEN 
       sum1 := sum1+ elem*2; 
      WHEN '8' THEN 
       sum1 := sum1+ elem*10; 
      WHEN '9' THEN 
       sum1 := sum1+ elem*9; 
      WHEN '10' THEN 
       sum1 := sum1+ elem*8; 
      WHEN '11' THEN 
       sum1 := sum1+ elem*7;  
      WHEN '12' THEN 
       sum1 := sum1+ elem*6;  
      WHEN '13' THEN 
       sum1 := sum1+ elem*5; 
      WHEN '14' THEN 
       sum1 := sum1+ elem*4; 
      WHEN '15' THEN 
       sum1 := sum1+ elem*3; 
      WHEN '16' THEN 
       sum1 := sum1+ elem*2;   
      ELSE 
       dbms_output.put_line('Invalid Input');
     END CASE ;    
  --dbms_output.put_line('elem'||elem|| 'v_counter'|| v_counter);
 
   v_counter := v_counter+1;
  end loop ;
    
 select DECODE(MOD(sum1,11),10,'X',MOD(sum1,11)) into ninedig_value  from dual ;
 vin:=vin||ninedig_value||YEAR1(inputyear)||'1'||quantity;
 
 dbms_output.put_line('Nine digit value:'||ninedig_value);
 --dbms_output.put_line(testvin);
 --dbms_output.put_line(testvin2);
 --dbms_output.put_line('VIN:'||vin);
 --dbms_output.put_line('VIN:'||vin||ninedig_value||YEAR1(inputyear)||'1'||quantity);
 INSERTVIN (matnum, vin,coalesce(ordernumber,'E'),username ,modelnumber,color,inputyear);
  commit;
  dbms_output.put_line('VIN:'||vin);
  open vinout for 
 select vin from dual;
EXCEPTION
      
      WHEN check_matnum THEN
        open vinout for 
        select 'Please provide a valid Material Number' from dual;
        --dbms_output.put_line('Please provide a valid Material Number');
        record_error('1','Please provide a valid Material Number');
      --RAISE_APPLICATION_ERROR(-20500,'Please provide a valid Material Number');
      WHEN OTHERS THEN
         v_err_code := SQlCODE ;
         v_err_msg := 'For Material Number:'||matnum||' :Encountered the  following error :'||SUBSTR(SQLERRM,1,200);
         --dbms_output.put_line('Error Code '||v_err_code||' Error Message'||v_err_msg);
         open vinout for 
        select  'Error Code:'||v_err_code||':'|| v_err_msg from dual;
         record_error(v_err_code,v_err_msg);
         --RAISE_APPLICATION_ERROR(-20500,'An exception has occured'||v_err_code||v_err_msg);
END VIN_generation;

PROCEDURE INSERTVIN (matnum IN VARCHAR2,VIN IN VARCHAR2,ORDERNUMBER IN VARCHAR2,username in VARCHAR2,MODELNUMBER in VARCHAR2,COLOR in VARCHAR2,yearmodel in VARCHAR2)
is 
BEGIN
insert into zppcontrolvin (SERNR, datedescar, aedat, usnam, horadescar, codigolin,codigomod, codinomi, coditrans, consecu, aufnr, matnr, status,modelo,color,YEARMODEL) values (VIN,to_date(sysdate,'dd.mm.yyyy'),to_date(sysdate,'dd.mm.yyyy'),username,to_char(TO_DATE ( TO_CHAR (SYSTIMESTAMP, 'YYYY-MON-DD HH24:MI:SS'),'YYYY-MON-DD HH24:MI:SS'),'hh24:mi:ss am'),substr(vin,4,1),substr(vin,5,2),substr(vin,7,1),substr(vin,8,1),substr(vin,12,6),ORDERNUMBER,matnum,'X',modelnumber,color,yearmodel);
 dbms_output.put_line('Quantity'||TRIM(LEADING '0' from (substr(vin,12,6)))||'VIN:'||vin||'matnum:'|| matnum||'ordernumber:'|| ordernumber||'Color'|| color);

END INSERTVIN;

PROCEDURE Record_Error(errorcode in VARCHAR2 DEFAULT null,errormessage in varchar2 default null)   is 
 l_code   PLS_INTEGER ;
 l_mesg  VARCHAR2(32767) ;
 
BEGIN
if (errorcode is NULL) then 
  l_code := SQLCODE;
else 
  l_code := errorcode ;
end IF ;
if (errorcode is NULL) then 
  l_mesg := SQLERRM;
else 
  l_mesg := errormessage;
end IF ;

 
INSERT INTO error_log (error_code
                        ,  error_message
                        ,  backtrace
                        ,  callstack
                        ,  created_on
                        ,  created_by)
        VALUES (l_code
              ,  l_mesg 
              ,  sys.DBMS_UTILITY.format_error_backtrace
              ,  sys.DBMS_UTILITY.format_call_stack
              ,  SYSDATE
              ,  USER);
END Record_Error;

end generate_VIN;

/
