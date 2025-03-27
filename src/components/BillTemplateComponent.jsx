import React from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import logo from '../assets/logo (2).png';

Font.register({
  family: 'Roboto',
  src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Me5Q.ttf',
});

const pdfStyles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    border: "1px solid #16A34A",
    fontFamily: 'Roboto',
  },
  section: {
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  dimColor:{color:"#4f4f4f"},
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#16A34A', 
  },
  heading: {
    backgroundColor: '#16A34A', 
    color: 'white',
    padding: 8, 
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 14,
  },
  text: {
    marginBottom: 3,
    fontSize: 12,
  },
  boldText: {
    fontSize: 12,
    fontWeight: 'bold',
    color:"black"
  },
  // Table styles
  table: {
    display: 'table',
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeaderCell: {
    padding: 8, 
    border: '1px solid #E5E7EB', 
    textAlign: 'left', 
    fontWeight: '600', 
    fontSize: 12, 
    backgroundColor: '#16A34A', 
    color: 'white',
    flexBasis: '25%',
  },
  tableCell: {
    padding: 8, 
    border: '1px solid #E5E7EB', 
    textAlign: 'left',
    fontSize: 12, 
    color: '#374151', 
    flexBasis: '25%', 
  },
  tableCellCenter: {
    textAlign: 'center', 
  },
  totalRow: {
    fontWeight: 'bold',
    backgroundColor: '#F3F4F6', 
  },
  totalText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  totalBox:{
    border: '1px solid #E5E7EB',
    textAlign: 'right',
    width:'50%',
    marginTop:'10px',
    marginLeft: "50%"
  },
  // Additional styles for the totals row
  totalTableRow: {
    flexDirection: 'row',
    marginTop: 1,
  },
  totalCellLabelFull: {
    width: '150px',
    padding: 1,
    textAlign: 'right',
    fontSize: 12,
    borderRight: '1px solid #E5E7EB',
  },
  totalCellValueFull: {
   width:"150px",
    padding: 4,
    textAlign: 'center',
    fontSize: 12,
    borderLeft: '1px solid #E5E7EB',
  },
});

// Create a PDF component
const BillDocument = ({
  company_name,
  company_contact= "+91 9986636773",
  company_address = `\nUnG Agro, \n#32, 1st Main, 2nd Cross, \nMuneshwara Layout, Laggere, \nBengaluru, Karnataka, \nIndia - 560058`,
  customer_name,
  bill_date,
  invoice_no,
  gst_no,
//   address,
  order_id,
  order_date,
//   shipped_date,
  shipped_from,
  delivered_address,
  products,
  sub_total,
  gst,
  grand_total,
  policy = ["Once a product is delivered, it is non-returnable."],
}) => {
  const totalQuantity = products.reduce((acc, product) => acc + product.quantity, 0);
  console.log(products)

  return (
    <Document>
      <Page style={pdfStyles.page}>
        <View>
        {/* Header with Company Name and Logo */}
        <View style={pdfStyles.headerContainer}>
          <Image src={logo} style={pdfStyles.logo} />
          <Text style={pdfStyles.companyName}>{company_name}</Text>
        </View>

        {/* User Details Section */}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.heading}>Bill Details</Text>
          <Text style={[pdfStyles.text,pdfStyles.dimColor]}><Text style={pdfStyles.boldText}>Name:</Text> {customer_name}</Text>
          <Text style={[pdfStyles.text,pdfStyles.dimColor]}><Text style={pdfStyles.boldText}>Bill Date:</Text> {bill_date}</Text>
          <Text style={[pdfStyles.text,pdfStyles.dimColor]}><Text style={pdfStyles.boldText}>Invoice No:</Text> {invoice_no}</Text>
          <Text style={[pdfStyles.text,pdfStyles.dimColor]}><Text style={pdfStyles.boldText}>GST No:</Text> {gst_no}</Text>
          {/* <Text style={[pdfStyles.text,pdfStyles.dimColor]}><Text style={pdfStyles.boldText}>Billing Address:</Text> {address}</Text> */}
        </View>

        {/* Order Details Section */}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.heading}>Order Details</Text>
          <Text style={[pdfStyles.text,pdfStyles.dimColor]}><Text style={pdfStyles.boldText}>Order ID:</Text> {order_id}</Text>
          <Text style={[pdfStyles.text,pdfStyles.dimColor]}><Text style={pdfStyles.boldText}>Order Date:</Text> {order_date}</Text>
          {/* <Text style={[pdfStyles.text,pdfStyles.dimColor]}><Text style={pdfStyles.boldText}>Shipped Date:</Text> {shipped_date}</Text> */}
          <Text style={[pdfStyles.text,pdfStyles.dimColor]}><Text style={pdfStyles.boldText}>Shipped From:</Text> {shipped_from}</Text>
          <Text style={[pdfStyles.text,pdfStyles.dimColor]}><Text style={pdfStyles.boldText}>Delivered Address:</Text> {delivered_address}</Text>
        </View>

        {/* Product Table Section */}
        <View style={pdfStyles.section}>
          <View style={pdfStyles.table}>
            <View style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableHeaderCell}>ID</Text>
              <Text style={pdfStyles.tableHeaderCell}>Product Name</Text>
              <Text style={pdfStyles.tableHeaderCell}>Quantity</Text>
              <Text style={[pdfStyles.tableHeaderCell, pdfStyles.tableCellCenter]}>Price</Text>
            </View>
            {products.map((product, index) => (
              <View key={index} style={pdfStyles.tableRow}>
                <Text style={pdfStyles.tableCell}>{index + 1}</Text>
                <Text style={pdfStyles.tableCell}>{product.product.name}</Text>
                <Text style={pdfStyles.tableCell}>{product.quantity}</Text>
                <Text style={[pdfStyles.tableCell, pdfStyles.tableCellCenter]}> {"\u20B9"} {product.totalProductPrice}</Text>
              </View>
            ))}
            <View style={[pdfStyles.tableRow]}>
              <Text style={pdfStyles.tableCell}></Text>
              <Text style={{...pdfStyles.tableCell, ...pdfStyles.totalText}}>Total</Text>
              <Text style={pdfStyles.tableCell}>{totalQuantity}</Text>
              <Text style={[pdfStyles.tableCell, pdfStyles.tableCellCenter]}> {"\u20B9"} {sub_total}</Text>
            </View>
          </View>

          {/* CGST, SGST, and Grand Total Section */}
          <View style={pdfStyles.totalBox}>
          <View style={pdfStyles.totalTableRow}>
            <Text style={pdfStyles.totalCellLabelFull}>GST</Text>
            <Text style={pdfStyles.totalCellValueFull}> {"\u20B9"} {gst}</Text>
          </View>
          {/* <View style={pdfStyles.totalTableRow}>
            <Text style={pdfStyles.totalCellLabelFull}>SGST</Text>
            <Text style={pdfStyles.totalCellValueFull}> {"\u20B9"} {sgst}</Text>
          </View> */}
          <View style={pdfStyles.totalTableRow}>
            <Text style={[pdfStyles.totalCellLabelFull,{fontWeight: 'bold',borderTop:'1px solid #E5E7EB'}]}>Grand Total</Text>
            <Text style={[pdfStyles.totalCellValueFull,{borderTop:'1px solid #E5E7EB'}]}> {"\u20B9"} {grand_total}</Text>
          </View>
          </View>
        </View>


        <View style={pdfStyles.section}>
        <Text style={{ color: "black", fontWeight :"bold", fontSize:"14px",marginBottom:5,borderBottom:"1px solid black"}}></Text>
          <Text style={[pdfStyles.text,pdfStyles.dimColor,{fontSize:"10px"}]}><Text style={{...pdfStyles.boldText,fontSize:"16px"}}>{company_name}</Text></Text>
          <Text style={[pdfStyles.text,pdfStyles.dimColor,{fontSize:"10px"}]}><Text style={[pdfStyles.boldText,{fontSize:"12px",color:"#494949"}]}>Contact No:</Text> {company_contact}</Text>
          <Text style={[pdfStyles.text,pdfStyles.dimColor,{fontSize:"10px"}]}><Text style={[pdfStyles.boldText, {fontSize:"12px",color:"#494949"}]}>Permanent Address:</Text> {company_address}</Text>
        </View>

        <Text style={{ marginTop: 2, fontSize: 10 }}>Note:</Text>     
        <Text style={{ marginTop: 2, marginLeft: "20px",fontSize: 8 }}>This is a system generated bill through {company_name}</Text>
        {policy.map((policy_lines) => (
        <Text key={policy_lines} style={{ marginTop: 2, marginLeft: "20px", fontSize: 8 }}>
          {policy_lines}
        </Text>
      ))}

      </View>
      </Page>
    </Document>
  );
};

const BillTemplateComponent = (props) => {
    console.log(props)
  return (

    <div>
      
      {/* PDF Download Link */}
      <PDFDownloadLink
        document={<BillDocument {...props} />}
        fileName={`${props.invoice_no}.pdf`}
      >
        {({ loading }) =>
          loading ? 'Generating PDF...' : <button className='bg-green-500 text-white p-2 rounded'>Download Invoice</button>
        }
      </PDFDownloadLink>
    </div>
  );
};

export default BillTemplateComponent;
