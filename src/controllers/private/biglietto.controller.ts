import { Request, Response, Router } from 'express';

const router = Router();

router.get('biglietto/lista', async () => {

})
router.get('biglietto/:idBiglietto', async (req: Request, res: Response) => {
  const idBiglietto = req.params.idBiglietto;
})
router.post('biglietto', async () => {

})
router.put('biglietto/:idBiglietto', async () => {

})
router.delete('biglietto/:idBiglietto', async () => {

})
export {
  router as bigliettoController
};
