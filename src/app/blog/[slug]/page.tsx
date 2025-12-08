import { notFound } from 'next/navigation';
import { articles } from '@/lib/blog-data';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

const getArticleFromSlug = (slug: string) => {
  return articles.find(article => article.slug === slug);
};

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticleFromSlug(params.slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} | ResumeAI Blog`,
    description: article.excerpt,
  };
}

const ArticlePage = ({ params }: Props) => {
  const { slug } = params;
  const article = getArticleFromSlug(slug);

  if (!article) {
    notFound();
  }

  const img = getPlaceholderImage(article.imageId);

  return (
    <div className="py-12 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article>
          <div className="mb-8">
            <Link href="/blog">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            <h1 className="font-headline text-3xl md:text-5xl font-bold mb-4">{article.title}</h1>
            <div className="flex items-center space-x-6 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{article.readTime}</span>
              </div>
              <span>By {article.author}</span>
            </div>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 shadow-lg">
            <Image
              src={img.imageUrl}
              alt={article.title}
              width={img.width}
              height={img.height}
              className="w-full h-full object-cover"
              data-ai-hint={img.imageHint}
              priority
            />
          </div>
          
          <div 
            className="prose prose-lg max-w-none text-foreground/90 prose-headings:font-headline prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </div>
    </div>
  );
};

export default ArticlePage;

export async function generateStaticParams() {
  return articles.map(article => ({
    slug: article.slug,
  }));
}
