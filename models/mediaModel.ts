import mongoose, { Schema, Document } from 'mongoose';

interface IMedia extends Document {
  author: string;
  image: any;
  title: string;
  content: string;
}

const mediaSchema: Schema = new Schema(
  {
    author: {
      type: String,
      default: true,
    },
    url: {
      type: String,
      default: true,
    },
    image: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Media = mongoose.model<IMedia>('Media', mediaSchema);

export default Media;
