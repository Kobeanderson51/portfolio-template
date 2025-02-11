<?php
/**
 * Template Name: Services Page
 * Description: A template for displaying the services page with SEO optimization
 */

get_header(); ?>

<main>
    <section id="services" class="services section">
        <div class="container">
            <div class="section-header text-center mb-5">
                <h1 class="display-4 mb-3"><?php the_title(); ?></h1>
                <?php if (get_field('page_subtitle')): ?>
                    <p class="lead text-muted"><?php echo esc_html(get_field('page_subtitle')); ?></p>
                <?php endif; ?>
            </div>

            <?php
            // Check if ACF is active and we have services
            if (have_rows('services')): ?>
                <div class="services-grid">
                    <?php while (have_rows('services')): the_row(); ?>
                        <div class="service-item animate">
                            <div class="service-icon">
                                <i class="<?php echo esc_attr(get_sub_field('icon_class')); ?>"></i>
                            </div>
                            <h3><?php echo esc_html(get_sub_field('title')); ?></h3>
                            <p><?php echo esc_html(get_sub_field('description')); ?></p>
                            <div class="service-hover">
                                <p>Key Focus: <?php echo esc_html(get_sub_field('key_focus')); ?></p>
                            </div>
                        </div>
                    <?php endwhile; ?>
                </div>
            <?php else: ?>
                <!-- Fallback static content if no ACF data is available -->
                <div class="services-grid">
                    <div class="service-item animate">
                        <div class="service-icon">
                            <i class="fas fa-cogs"></i>
                        </div>
                        <h3>1. Operational Efficiency</h3>
                        <p>Streamlining processes in production, inventory, and supply chain to reduce waste, lower costs, and increase profitability.</p>
                        <div class="service-hover">
                            <p>Key Focus: Process Optimization, Cost Reduction, Productivity Enhancement</p>
                        </div>
                    </div>
                    <!-- Add other static service items here -->
                </div>
            <?php endif; ?>
        </div>
    </section>

    <?php if (get_field('show_cta_section')): ?>
    <section id="cta" class="cta-section">
        <div class="container text-center">
            <h2><?php echo esc_html(get_field('cta_title')); ?></h2>
            <p><?php echo esc_html(get_field('cta_description')); ?></p>
            <a href="<?php echo esc_url(get_field('cta_button_link')); ?>" class="btn btn-primary">
                <?php echo esc_html(get_field('cta_button_text')); ?>
            </a>
        </div>
    </section>
    <?php endif; ?>
</main>

<?php get_footer(); ?>
