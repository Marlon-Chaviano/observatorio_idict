// import * as React from "react";
// import Dialog from "@mui/material/Dialog";
// import Slide from "@mui/material/Slide";
// import { TransitionProps } from "@mui/material/transitions";
// import { usePDF } from "react-to-pdf";
// import { GRAFICOS } from "../enums/GRAFICOS";
// import { Container } from "@mui/material";
// import CustomAppBar from "./CustomAppBar";
// import FullFeaturedCrudGrid from "./CustomTable";
// import { CustomLinearChart } from "./charts/CustomLineChart";
// import { CustomPie } from "./charts/CustomPie";

// import JSON_AUX from "../const/contants";

// const Transition = React.forwardRef(function Transition(
//   props: TransitionProps & {
//     children: React.ReactElement;
//   },
//   ref: React.Ref<unknown>
// ) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// interface PropsDialogGraficas {
//   open: boolean;
//   handleClose: () => void;
// }

// // const generateDataWithConnections = (count: number) => {
// //   const nodes = [];
// //   const links = [];

// //   for (let i = 1; i <= count; i++) {
// //     const node = {
// //       id: i,
// //       x: Math.random() * 100,
// //       y: Math.random() * 100,
// //       label: "Autor " + Math.round(Math.random() * 100),
// //     };
// //     nodes.push(node);

// //     if (i > 1) {
// //       // Conecta el nodo actual con los dos nodos anteriores
// //       links.push([nodes[i - 1], node]);
// //       links.push([nodes[i - 2], node]);
// //     }
// //   }

// //   return { nodes, links };
// // };

// const GraficasDialog: React.FC<PropsDialogGraficas> = ({
//   open,
//   handleClose,
// }) => {
//   const [showGrafica, setshowGrafica] = React.useState<GRAFICOS>(
//     GRAFICOS.TABLE
//   );

//   const { toPDF, targetRef } = usePDF({ filename: "graficos.pdf" });
//   return (
//     <React.Fragment>
//       <Dialog
//         fullScreen
//         open={open}
//         onClose={handleClose}
//         TransitionComponent={Transition}
//       >
//         <CustomAppBar
//           toPDF={toPDF}
//           tipoGrafica={showGrafica}
//           onTap={setshowGrafica}
//           handleClose={handleClose}
//         >
//           {showGrafica == GRAFICOS.TABLE && (
//             <Container>
//               <FullFeaturedCrudGrid />
//             </Container>
//           )}
//           {showGrafica == GRAFICOS.LINEAL && (
//             <Container ref={targetRef} maxWidth="md">
//               <CustomLinearChart data={JSON_AUX.allLinesLinear} />
//             </Container>
//           )}
//           {showGrafica == GRAFICOS.PIE && (
//             <Container ref={targetRef} maxWidth="sm">
//               <CustomPie />
//             </Container>
//           )}
//           {showGrafica == GRAFICOS.LINEAL_AUTHOR && (
//             <Container ref={targetRef} maxWidth="md">
//               <CustomLinearChart data={JSON_AUX.oneLinesAutor} />
//             </Container>
//           )}
//           {showGrafica == GRAFICOS.LINEAL_TITTLE && (
//             <Container ref={targetRef} maxWidth="md">
//               <CustomLinearChart data={JSON_AUX.oneLinesTittle} />
//             </Container>
//           )}
//           {showGrafica == GRAFICOS.LINEAL_DATE && (
//             <Container ref={targetRef} maxWidth="md">
//               <CustomLinearChart data={JSON_AUX.oneLinesFecha} />
//             </Container>
//           )}
//           {showGrafica == GRAFICOS.LINEAL_EDITORIAL && (
//             <Container ref={targetRef} maxWidth="md">
//               <CustomLinearChart data={JSON_AUX.oneLinesEditorial} />
//             </Container>
//           )}
//           {showGrafica == GRAFICOS.LINEAL_DATE && (
//             <Container ref={targetRef} maxWidth="md">
//               <CustomLinearChart data={JSON_AUX.oneLinesMateria} />
//             </Container>
//           )}
//           {showGrafica == GRAFICOS.LINEAL_PLACE_ORGANIZATION && (
//             <Container ref={targetRef} maxWidth="md">
//               <CustomLinearChart data={JSON_AUX.oneLinesOrganizacion} />
//             </Container>
//           )}
//           {showGrafica == GRAFICOS.LINEAL_PLACE_ORGANIZATION && (
//             <Container ref={targetRef} maxWidth="md">
//               <CustomLinearChart data={JSON_AUX.oneLinesPlaceOrganizacion} />
//             </Container>
//           )}
//         </CustomAppBar>
//       </Dialog>
//     </React.Fragment>
//   );
// };

// export default GraficasDialog;
