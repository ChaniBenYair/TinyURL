import LinkModel from "../Models/LinkModel.js"

const LinkController = {
    getList: async (req, res) => {
        try {
          const links = await LinkModel.find();
          res.status(200).json(links);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
    getById: async (req, res) => {
        try {
            const link = await LinkModel.findById(req.params.id);
            if (!link) {
                return res.status(404).send({ message: "link not found" });
            }
            res.send(link);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error fetching link" });
        }
    },
    add:async (req, res) => {
        try {
          const { originalUrl } = req.body;
          const newLink = new Link({ originalUrl });
          const savedLink = await newLink.save();
          res.status(201).json(savedLink);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
    update:async (req, res) => {
        try {
          const { id } = req.params;
          const updatedLink = await LinkModel.findByIdAndUpdate(id, req.body, { new: true });
          res.status(200).json(updatedLink);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
    delete: async (req, res) => {
        try {
          const { id } = req.params;
          await LinkModel.findByIdAndDelete(id);
          res.status(200).json({ message: 'Link deleted successfully' });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
}
export default LinkController;