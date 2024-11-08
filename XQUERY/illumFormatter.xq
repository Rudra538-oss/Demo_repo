declare namespace math="http://www.w3.org/2005/xpath-functions/math";
let $doc := /*
return <Rowsets>
    <Rowset>
        <Columns>
          {
                for $cl in $doc/row[1]/*
                return <Column Name="{$cl/local-name()}"/>
          }
        </Columns>
       
        {
            for $row in $doc/row
            return <Row>{$row/*}</Row>
        }
    </Rowset>
</Rowsets>